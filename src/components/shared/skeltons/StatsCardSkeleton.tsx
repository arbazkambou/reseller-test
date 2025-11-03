import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface StatsOverviewSkeletonProps {
  title?: string;
  cardCount?: number;
  className?: string;
}

export function StatsCardSkeleton({
  cardCount = 8,
  className = "",
}: StatsOverviewSkeletonProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4  @xl/main:grid-cols-2 @3xl/main:grid-cols-3  @7xl/main:grid-cols-5">
        {Array.from({ length: cardCount }).map((_, index) => (
          <StatCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <Card className="relative flex flex-col gap-0.5  shadow-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 px-4">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-12" />
      </CardContent>
    </Card>
  );
}
