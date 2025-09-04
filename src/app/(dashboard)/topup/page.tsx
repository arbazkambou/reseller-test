import { TopupForm } from "@/components/features/credits/TopupForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const experimental_ppr = true;

function Page() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <CardTitle className="text-xl">Topup Wallet</CardTitle>
          </div>
          <CardDescription>
            Add funds to your wallet to purchase eSIMs and manage your account
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <TopupForm />
        </CardContent>
      </Card>
    </div>
  );
}

export default Page; 