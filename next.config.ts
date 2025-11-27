import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
      {
        hostname: "cultura.uol.com.br",
      },
    ],
  },
}

export default nextConfig
