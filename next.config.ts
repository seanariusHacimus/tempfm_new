import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/nowonair/:path*",
        destination: "https://test.tempfm.uz/nowonair/:path*",
      },
    ];
  },
};

export default nextConfig;
