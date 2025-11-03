import GetUser from "@/components/features/auth/GetUser";
import CartQuantityButton from "@/components/features/cart/CartQuantityButton";
import GetUserBalance from "@/components/features/user/GetUserBalance";
import UserBalanceSkelton from "@/components/features/user/UserBalanceSkelton";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import ReduxProvider from "@/providers/ReduxProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NuqsAdapter>
      <ReduxProvider>
        <SidebarProvider
          style={
            {
              "--sidebar-width": "calc(var(--spacing) * 72)",
              "--header-height": "calc(var(--spacing) * 12)",
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset">
            <div className="flex sm:hidden">
              <Suspense
                fallback={<Skeleton className="h-8 rounded-full w-20" />}
              >
                <GetUser />
              </Suspense>
            </div>
          </AppSidebar>
          <SidebarInset>
            <SiteHeader>
              <Suspense fallback={<UserBalanceSkelton />}>
                <GetUserBalance />
              </Suspense>

              <div className="flex items-center gap-2">
                <CartQuantityButton />

                <div className="hidden sm:flex">
                  <Suspense
                    fallback={<Skeleton className="h-8 rounded-full w-20" />}
                  >
                    <GetUser />
                  </Suspense>
                </div>

                <ThemeToggle />
              </div>
            </SiteHeader>
            <div className="flex flex-1 flex-col">
              <div className="@container/main flex flex-1 flex-col gap-2">
                <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">
                  {children}
                </div>
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </ReduxProvider>
    </NuqsAdapter>
  );
}
