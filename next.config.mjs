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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // The old static home page used to live at public/index.html; keep any indexed copy pointing at the real home page.
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
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
