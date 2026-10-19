import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname:
          'br-royal-recipe-alcytjw9.storage.c-3.eu-central-1.aws.neon.tech',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
