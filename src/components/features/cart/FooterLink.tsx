import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";

type LinkTarget = "_blank" | "_self" | "_parent" | "_top";

interface PropsType extends LinkProps {
  children: React.ReactNode;
  className?: string;
  target?: LinkTarget;
  rel?: string;
  linkProps?: LinkProps;
}

function FooterLink({ children, className, ...linkProps }: PropsType) {
  return (
    <Link
      className={cn(
        "group flex items-center gap-4 text-foreground-light transition-all hover:text-primary hover:underline hover:underline-offset-4",
        className,
      )}
      {...linkProps}
    >
      {children}
    </Link>
  );
}

export default FooterLink;
