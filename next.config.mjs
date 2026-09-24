/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/sell-for-me',
        destination: '/market-and-sell',
        permanent: true,
      },
      // Retired car-buying/valuation pages; old links and ads now land on Market & Sell.
      ...['/quote', '/fb', '/continue', '/vehicle-details'].map((path) => ({
        source: `${path}/:rest*`,
        destination: '/market-and-sell',
        permanent: false,
      })),
    ]
  },
}

export default nextConfig
