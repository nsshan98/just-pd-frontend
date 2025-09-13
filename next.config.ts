import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://res.cloudinary.com/dbtxlctdz/**')],
  },
};

export default nextConfig;
