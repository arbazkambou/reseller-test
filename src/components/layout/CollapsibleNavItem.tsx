"use client";

import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { CollapsibleNavItem as CollapsibleNavItemType } from "@/types/component.types";
import Link from "next/link";
import { usePathname } from "next/navigation";

function CollapsibleNavItem({ item }: { item: CollapsibleNavItemType }) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const firstSubUrl: string = item.items?.[0]?.url || "#";

  return (
    <Collapsible key={item.title} className="group/collapsible">
      <SidebarMenuItem>
        {state === "collapsed" ? (
          <SidebarMenuButton
            tooltip={item.title}
            asChild
            className="py-4 sm:py-5 font-semibold"
          >
            <Link href={firstSubUrl}>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        ) : (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                className="py-4 sm:py-5 font-semibold"
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {item.items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      asChild
                      className={`font-semibold py-3 sm:py-4 ${
                        subItem.url === pathname &&
                        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      } `}
                    >
                      <Link href={subItem.url}>
                        {subItem.icon && (
                          <span>
                            <subItem.icon size={14} />
                          </span>
                        )}
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
}

export default CollapsibleNavItem;
