import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [70, 75, 80, 85, 90, 100],
  },
  experimental: {
    ppr: "incremental",
    staleTimes: {
      static: 300,
      dynamic: 300,
    },
  },
};

export default nextConfig;
