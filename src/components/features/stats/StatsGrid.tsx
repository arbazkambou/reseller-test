import { cn } from "@/lib/utils";

function StatsGrid({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        `*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card  *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs grid grid-cols-1 gap-4  @xl/main:grid-cols-2 @3xl/main:grid-cols-3  @7xl/main:grid-cols-5`,
        className
      )}
    >
      {children}
    </div>
  );
}

export default StatsGrid;
