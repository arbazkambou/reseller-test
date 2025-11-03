import { PaymentResult } from "@/components/features/checkout/PaymentResult";

interface PageProps {
  searchParams: Promise<{
    status: string;
    message: string;
  }>;
}

async function Page({ searchParams }: PageProps) {
  const { status, message } = await searchParams;
  const isSuccess = status === "success" || status === "true";

  return (
    <section className="container mx-auto grid min-h-[60vh] place-items-center px-4 py-12">
      <PaymentResult isSuccess={isSuccess} message={message} />
    </section>
  );
}

export default Page;
