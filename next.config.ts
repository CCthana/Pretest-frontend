import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: "https://pretest-backend.onrender.com/auth/:path*", 
      },
      {
        source: "/user/:path*", 
        destination: "https://pretest-backend.onrender.com/user/:path*", 
      },
      {
        source: "/quote/:path*",
        destination: "https://pretest-backend.onrender.com/quote/:path*",
      },
      {
        source: "/", 
        destination: "https://pretest-backend.onrender.com",
      },
    ];
  },
};

export default nextConfig;
