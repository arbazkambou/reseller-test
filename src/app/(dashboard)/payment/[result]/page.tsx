import { StripeRedirectHandler } from "@/components/features/credits/StripeRedirectHandler";

interface PageProps {
  params: Promise<{
    result: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function Page({ params, searchParams }: PageProps) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  // Convert searchParams to URLSearchParams safely
  const urlSearchParams = new URLSearchParams();

  Object.entries(awaitedSearchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      urlSearchParams.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === "string") {
          urlSearchParams.append(key, v);
        }
      });
    }
  });

  return (
    <div className="min-h-screen">
      <StripeRedirectHandler
        result={awaitedParams.result}
        searchParams={urlSearchParams}
      />
    </div>
  );
}

export default Page;
