import { Button } from "@/components/ui/button";
import Image404 from "@/_assets/svgs/404.svg";
import Link from "next/link";
import Image from "next/image";
import { ArrowBigLeft } from "lucide-react";

export const metadata = {
  title: "Page Not Found!",
};

const NotFound = () => {
  const authedLinks = [
    { href: "/", label: "Dashboard" },
    { href: "/data-only-esim", label: "Packages" },
    { href: "/dealers", label: "Dealers" },
    { href: "/my-esims", label: "eSIMs" },
    { href: "/credits", label: "Credits" },
    { href: "/pricing", label: "Pricing" },
    { href: "/topup", label: "Topup" },
    { href: "/docs", label: "API Docs" },
  ];

  return (
    <main className="flex mt-10 md:ml-14 items-center justify-center px-6">
      <section className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
        {/* Left: heading, copy, and actions */}
        <div className="flex flex-col gap-6">
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Button asChild>
              <Link href="/">
                <ArrowBigLeft />
                Back to Homepage
              </Link>
            </Button>
          </div>
          <h1
            id="page-title"
            className="text-balance text-h1 font-semibold tracking-tight"
          >
            Oops! Page Not Found
          </h1>
          <p className="text-muted-foreground text-body leading-relaxed max-w-prose">
            Looks like the page you&apos;re looking for doesn&apos;t exist
            anymore — or maybe it never did. Lets get you back on track.
          </p>

          {/* Primary actions */}

          {/* Suggested links */}
          <nav
            aria-label="Suggested links"
            className="rounded-lg border border-border bg-card p-4 shadow-sm"
          >
            <p className="mb-3 text-tiny text-muted-foreground">
              Popular Pages You Might Be Looking For
            </p>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {authedLinks.map((item) => (
                <li key={item.href}>
                  <Button
                    asChild
                    className="w-full justify-center text-center hover:bg-primary hover:text-background"
                    variant="outline"
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Right: Illustration */}
        <aside className="hidden md:flex items-center justify-center">
          <div className="relative max-w-md w-[515px] h-[412px] flex items-center justify-center rounded-[30px] bg-slate-100  ">
            <Image
              src={Image404}
              alt="Page not found illustration"
              sizes="auto"
            />
          </div>
        </aside>
      </section>
    </main>
  );
};

export default NotFound;
