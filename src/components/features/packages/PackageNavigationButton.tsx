import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PropsType = {
  isActive: boolean;
  className?: string;
  children: React.ReactNode;
};

function PackageNavigationButton({ isActive, className, children }: PropsType) {
  return (
    <Button
      className={cn(
        `rounded-full p-5 sm:p-6 bg-secondary border shadow text-foreground hover:text-primary-foreground hover:border-transparent ${
          isActive && "bg-primary text-primary-foreground border-primary "
        }`,
        className
      )}
    >
      {children}
    </Button>
  );
}

export default PackageNavigationButton;
