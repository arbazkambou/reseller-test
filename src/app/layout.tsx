import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/providers/AuthProvider";
import { DateRangeProvider } from "@/providers/DateRangeProvider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import type { Metadata } from "next";
import { Geist, Sora } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "eSIM Card Reseller",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable}  ${sora.variable} antialiased text-body font-sora`}
        suppressHydrationWarning
      >
        <NextTopLoader
          showSpinner={false}
          color="var(--primary)"
          zIndex={110}
          initialPosition={0.08}
          height={3}
          easing="ease"
          speed={400}
          shadow="0 0 10px var(--primary), 0 0 5px var(--primary)"
        />
        <DateRangeProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider>
              <ReactQueryProvider>
                <Suspense>{children}</Suspense>
                <Toaster richColors closeButton position="top-center" />
              </ReactQueryProvider>
            </AuthProvider>
          </ThemeProvider>
        </DateRangeProvider>
      </body>
    </html>
  );
}
