// app/providers/auth-check.tsx
"use client";

import { useEffect } from "react";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { baseUrl } from "@/lib/api";

function AuthCheck() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" || status === "loading") return;

    const token = session?.accessToken;

    if (!token) {
      signOut({ callbackUrl: "/login" });
      return;
    }

    (async () => {
      try {
        const res = await fetch(`${baseUrl}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          await signOut({ callbackUrl: "/login" });
          return;
        }

        const data = await res.json();

        if (!data?.id) {
          await signOut({ callbackUrl: "/login" });
        }
      } catch {
        await signOut({ callbackUrl: "/login" });
      }
    })();
  }, [status, session]);

  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthCheck />
      {children}
    </SessionProvider>
  );
}
