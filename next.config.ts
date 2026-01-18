import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Zalecane dla Vercel
  outputFileTracingIncludes: {
    "/**": ["./ROOT/prisma/generated/prisma/*.node"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
