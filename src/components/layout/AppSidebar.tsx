"use client";

import * as React from "react";

import { NavUser } from "@/components/features/user/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavItemsData, UserData } from "@/lib/data/data";
import Logo from "./Logo";
import { MainNavbar } from "./MainNavbar";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon" {...props} className="flex flex-col gap-6">
      <SidebarHeader>{state === "expanded" && <Logo />}</SidebarHeader>
      <SidebarContent className="mt-6">
        <MainNavbar items={NavItemsData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={UserData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
