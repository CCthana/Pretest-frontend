import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: "http://localhost:8001/auth/:path*", 
      },
      {
        source: "/user/:path*", 
        destination: "http://localhost:8001/user/:path*", 
      },
      {
        source: "/quote/:path*",
        destination: "http://localhost:8001/quote/:path*",
      },
    ];
  },
};

export default nextConfig;
