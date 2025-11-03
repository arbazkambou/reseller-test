import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // reactCompiler: true,
  images: {
    qualities: [70, 75, 80, 85, 90, 100],
    remotePatterns: [
      new URL("https://dev.esimcard.com/**"),
      new URL("https://esimcard.com/**"),
      new URL("https://portal.esimcard.com/**"),
      new URL("https://flagcdn.com/**"),
      new URL("https://telna.esimcard.com/**"),
      new URL("https://11.esimcard.com/**"),
      new URL(
        "https://0ee609ac-264f-4f5f-bf6f-2514ec879936.esimcard.codiea.com/**"
      ),
      new URL("http://localhost/**"),
      new URL("http://10.8.0.1:8000/**"),
      new URL(
        "https://0ee609ac-264f-4f5f-bf6f-2514ec879936.esimcard.codiea.com/**"
      ),
    ],
  },
  experimental: {
    staleTimes: {
      static: 300,
      dynamic: 30,
    },
  },
  trailingSlash: true,
  async headers() {
    if (process.env.NODE_ENV === "production") {
      return [
        {
          source: "/:path*{/}?",
          headers: [
            {
              key: "X-Accel-Buffering",
              value: "no",
            },
          ],
        },
        {
          source: "/_next/static/:path*",
          headers: [
            {
              key: "Cache-Control",
              value: "public, max-age=31536000, immutable",
            },
          ],
        },
      ];
    }
    return [];
  },
};

export default withSentryConfig(nextConfig, {
  org: "codiea",
  project: "esimcard-partner",
  silent: true,
  disableLogger: true,
});
