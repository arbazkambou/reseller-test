import Redoc from "@/components/features/redoc/Redoc";

export default function Page() {
  return (
    <main className="min-h-screen">
      <Redoc specUrl="/resellerApiDocs.json" />
    </main>
  );
}
