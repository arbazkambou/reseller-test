"use client";

import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { NavItems } from "@/types/component.types";
import CollapsibleNavItem from "./CollapsibleNavItem";
import SimpleNavItem from "./SimpleNavItem";

export function MainNavbar({ items }: { items: NavItems }) {
  return (
    <SidebarGroup>
      {/* <SidebarGroupLabel>Menu</SidebarGroupLabel> */}
      <SidebarMenu>
        {items.map((item) => {
          const { isCollapsible } = item;
          return isCollapsible ? (
            <CollapsibleNavItem item={item} key={item.title} />
          ) : (
            <SimpleNavItem item={item} key={item.title} />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
