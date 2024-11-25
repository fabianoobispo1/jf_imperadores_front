import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/**', // Permite qualquer caminho
      },
      {
        protocol: 'https',
        hostname: 'gravatar.com',
        pathname: '/**', // Permite qualquer caminho
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**', // Permite qualquer caminho
      },
    ],
  },
}
export default nextConfig
