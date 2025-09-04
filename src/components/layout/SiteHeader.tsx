"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Badge } from "../ui/badge";
import { NavUser } from "../features/user/NavUser";
import { UserData } from "@/lib/data/data";
import { useSession } from "next-auth/react";
import { Skeleton } from "../ui/skeleton";

export function SiteHeader() {
  const { data, status } = useSession();
  const isAuthLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return (
    <header className="flex bg-card border shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 shadow rounded-xl mt-2 mx-4 lg:mx-6 h-16 px-2 sm:px-4">
      <div className="flex items-center w-full gap-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1 text-primary" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </div>
        <div className="flex-1 flex items-center justify-between">
          {isAuthLoading && (
            <Badge className="flex items-center justify-center">
              Your balance is: <Skeleton className="h-3.5 w-10" />
            </Badge>
          )}
          {!isAuthLoading && isAuthenticated && (
            <Badge className="flex items-center justify-center">
              Your balance is: ${data.user.balance.toFixed(2)}
            </Badge>
          )}

          <div className="flex items-center gap-2">
            <NavUser user={UserData} />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
