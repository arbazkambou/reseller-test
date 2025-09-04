"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { SimpleNavItem as SimpleNavItemType } from "@/types/component.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SimpleNavItem({ item }: { item: SimpleNavItemType }) {
  const isExternalLink = item.target === "_blank";

  const pathname = usePathname();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={item.title}
        asChild
        className={`${
          pathname === item.url &&
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
        } py-4 sm:py-5 font-semibold`}
      >
        {isExternalLink ? (
          <a href={item.url} target="_blank" rel="noopener noreferrer">
            <item.icon />
            <span>{item.title}</span>
          </a>
        ) : (
          <Link href={item.url}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default SimpleNavItem;
