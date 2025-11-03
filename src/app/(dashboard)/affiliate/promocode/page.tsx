import GetPromo from "@/components/features/promocode/GetPromo";
import { DataTableSkeleton } from "@/components/shared/skeltons/DataTableSkelton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

function Page({ searchParams }: { searchParams: Promise<SearchParams> }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl mb-4">
          Promocode / Referral Instructions
        </CardTitle>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
          <CardDescription className="text-sm leading-relaxed text-muted-foreground space-y-3 flex-1">
            <p>
              Earn commissions by promoting our eSIM services. Simply share any
              URL from our site with{" "}
              <code className="bg-muted text-foreground px-1.5 py-0.5 font-semibold rounded-md text-xs">
                ?referral=YourPromoCode
              </code>{" "}
              added at the end.
            </p>

            <p>
              <span className="text-foreground font-semibold mr-2 ml-4">
                1-Share Your Link:
              </span>
              Promote eSIM Card using your unique referral link —
              <span className="text-primary hover:underline font-medium">
                https://esimcard.com/esim/united-states/?referral=YOUR_PROMO_CODE
              </span>
              .
            </p>

            <p>
              <span className="text-foreground font-semibold ml-4 mr-2">
                2-Earn Commissions:
              </span>
              Earn a commission for every purchase made through your link.
            </p>

            <p>
              <span className="text-foreground mr-2 font-semibold">
                Example Referral Link:
              </span>
              <span className="text-primary hover:underline font-medium">
                https://esimcard.com/?referral=VKZu0VSlQw
              </span>
              .
            </p>

            <p className="font-medium text-foreground">
              Start earning today by sharing eSIM Card with your network!
            </p>
          </CardDescription>

          <div className="w-full lg:w-[480px] -mt-14 h-[270px] rounded-xl overflow-hidden shadow-md flex-shrink-0">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dEKkauPfD8Y?start=1"
              title="Promocode Instructions Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<DataTableSkeleton />}>
          <GetPromo searchParams={searchParams} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

export default Page;
