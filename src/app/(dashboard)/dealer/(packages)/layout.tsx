"use client";

import PackageNavigationButton from "@/components/features/packages/PackageNavigationButton";
import SearchPackagesList from "@/components/features/packages/SearchPackagesList";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { dealerDataOnlyLinks, dealerDataVoiceLinks } from "@/lib/data/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function PackagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const esimLinks = pathname.startsWith("/dealer/data-only-esim/")
    ? dealerDataOnlyLinks
    : dealerDataVoiceLinks;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Explore our eSIM Packages</CardTitle>
          <CardDescription>
            Travel smarter with hassle-free eSIM options.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-12">
          <section className="grid w-full  gap-[2.31rem] xl:grid-cols-[auto_1fr_auto]  xl:gap-[4rem]">
            <div className="flex items-center justify-center gap-[1.5rem] md:gap-[2rem] xl:order-2 xl:justify-end xl:gap-[1rem]">
              <Link href={"/dealer/data-only-esim"}>
                <PackageNavigationButton
                  isActive={pathname.startsWith("/dealer/data-only-esim")}
                >
                  Data Only
                </PackageNavigationButton>
              </Link>
              <Link href={"/dealer/data-voice-esim"}>
                <PackageNavigationButton
                  isActive={pathname.startsWith("/dealer/data-voice-esim")}
                >
                  Data Voice
                </PackageNavigationButton>
              </Link>
            </div>

            <div className="flex justify-center xl:order-1 xl:w-full xl:justify-start flex-grow">
              <SearchPackagesList />
            </div>

            <div className="flex w-full items-center justify-center gap-[1rem] xs:gap-[0.5rem] md:gap-[1rem] xl:-order-1 xl:justify-start">
              {esimLinks.map((item, index) => (
                <Link href={item.href} key={index}>
                  <PackageNavigationButton isActive={pathname === item.href}>
                    {item.label}
                  </PackageNavigationButton>
                </Link>
              ))}
            </div>
          </section>
          {children}
        </CardContent>
      </Card>
    </>
  );
}
