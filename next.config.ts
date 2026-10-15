import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [{ source: "/invitacion", destination: "/invitacion.html" }];
  },
};

export default nextConfig;
