import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface ChartSkeletonProps {
  className?: string;
  showLegend?: boolean;
}

export default function ChartSkeleton({
  className,
  showLegend = true,
}: ChartSkeletonProps) {
  return (
    <Card className={cn("w-full border-0 shadow-none", className)}>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-64" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[200px] w-full mb-4" />

        {showLegend && (
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Skeleton className="w-3 h-3" />
              <Skeleton className="h-3 w-16" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-3 h-3" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
