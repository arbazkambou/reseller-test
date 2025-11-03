import { Badge } from "@/components/ui/badge";
import { User } from "@/types/auth.types";

function UserBalance({ user }: { user: User }) {
  return (
    <Badge className="flex items-center justify-center">
      Your balance is: ${user.balance.toFixed(2)}
    </Badge>
  );
}

export default UserBalance;
