"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import BackButton from "./BackButton";

export function SiteHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="flex bg-card border shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-16 shadow rounded-xl mt-2 mx-4 lg:mx-6 h-16 px-2 sm:px-4">
      <div className="flex items-center w-full gap-2">
        <div className="flex items-center gap-2">
          <BackButton />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
          <SidebarTrigger className="-ml-1 text-primary" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </div>
        <div className="flex-1 flex items-center justify-between">
          {children && children}
        </div>
      </div>
    </header>
  );
}
