"use client";
import { generateSlug } from "@/helpers/generateSlug";
import { ArrowUpRight } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PropsType {
  slug: string;
  name: string;
  imgSrc: StaticImageData;
  index?: number;
}

function RegionImageCard({ name, slug, imgSrc }: PropsType) {
  const pathname = usePathname();
  const prefixUrl = pathname.startsWith("/reseller") ? "/reseller" : "/dealer";
  return (
    <div className="w-full">
      <Link
        href={
          pathname.includes("/data-voice-esim/regional/")
            ? `${prefixUrl}/data-voice/regional/${generateSlug(slug)}`
            : `${prefixUrl}/data-only/regional/${slug}`
        }
        className="w-full"
      >
        <div className="group relative h-[200px] w-full overflow-hidden rounded-[0.625rem] transition-transform hover:scale-105">
          <div className="relative z-30 flex h-full flex-col justify-between text-primary-foreground">
            <h3 className="ms-[1.2rem] mt-[0.5rem] text-start text-body-lg font-bold">
              {name}
            </h3>
            <div className="mb-[1.5rem] me-[1.5rem] flex justify-end">
              <ArrowUpRight className="relative z-40 transition-transform group-hover:rotate-45" />
            </div>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 z-10 bg-[linear-gradient(101deg,rgba(0,0,0,0.5)_0.87%,rgba(0,0,0,0)_100%)]"></div>

          {/* Background Image */}
          <Image
            src={imgSrc}
            alt={`eSIM for ${name}`}
            fill
            sizes="auto"
            className="object-cover transition-all group-hover:opacity-75 group-hover:shadow-2xl"
            quality={70}
          />
        </div>
      </Link>
    </div>
  );
}

export default RegionImageCard;
