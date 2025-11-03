"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DealerNavItemsData,
  ResellerNavItemsData,
  AffiliateNavItemsData,
} from "@/lib/data/data";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { MainNavbar } from "./MainNavbar";

export function AppSidebar({
  children,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const pathname = usePathname();

  const getNavItems = () => {
    if (pathname.startsWith("/reseller")) return ResellerNavItemsData;
    if (pathname.startsWith("/dealer")) return DealerNavItemsData;
    if (pathname.startsWith("/affiliate")) return AffiliateNavItemsData;
    return DealerNavItemsData;
  };
  return (
    <Sidebar collapsible="icon" {...props} className="flex flex-col gap-6">
      <SidebarHeader>{state === "expanded" && <Logo />}</SidebarHeader>
      <SidebarContent className="mt-6">
        <MainNavbar items={getNavItems()} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={UserData} />
      </SidebarFooter> */}
      {/* <SidebarRail /> */}

      {children && <SidebarFooter>{children}</SidebarFooter>}
    </Sidebar>
  );
}
