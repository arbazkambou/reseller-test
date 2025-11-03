"use client";

import logo from "@/_assets/logos/esim-logo.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Logo() {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname.startsWith("/reseller") ? "/reseller" : "/dealer"}`}
      className="relative h-[40px] w-[100px] md:h-[55px] md:w-[130px]"
    >
      <Image
        src={logo}
        fill
        alt="eSIM Card logo"
        sizes="auto"
        quality={70}
        priority
      />
    </Link>
  );
}

export default Logo;
