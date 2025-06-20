import type { NextConfig } from "next";

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
typescript: {
    // Desactivar el chequeo de tipos en producción
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
