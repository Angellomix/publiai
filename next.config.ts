import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Deshabilitar Turbopack para el build si está causando problemas con Prisma
  experimental: {
    // @ts-ignore
    turbo: false,
  },
  // Forzar que las APIs no se pre-rendericen
  trailingSlash: false,
};

export default nextConfig;
