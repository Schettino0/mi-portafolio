import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/invitacion", destination: "/invitacion.html" },
      { source: "/invitacion/lista", destination: "/invitacion-lista.html" },
    ];
  },
};

export default nextConfig;
