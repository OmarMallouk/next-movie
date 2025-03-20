import type { NextConfig } from "next";

console.log("NEXT_PUBLIC_API_URL at build:", process.env.NEXT_PUBLIC_API_URL);

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
