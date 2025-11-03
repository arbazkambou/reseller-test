import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

function UserBalanceSkelton() {
  return (
    <Badge className="flex items-center justify-center">
      Your balance is: <Skeleton className="h-3.5 w-10" />
    </Badge>
  );
}

export default UserBalanceSkelton;
