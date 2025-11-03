import { cn } from "@/lib/utils";

interface PropsType {
  children: React.ReactNode;
  className?: string;
}

function PackageDetailItem({ children, className }: PropsType) {
  return (
    <div
      className={cn(
        `flex items-center justify-between rounded-sm border bg-secondary px-3 py-2.5 text-base`,
        className,
      )}
    >
      {children}
    </div>
  );
}

export default PackageDetailItem;
