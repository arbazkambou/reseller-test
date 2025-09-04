import logo from "@/_assets/logos/esim-logo.png";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link
      href={"/"}
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
