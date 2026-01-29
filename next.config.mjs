import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Force dynamic rendering for all routes
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};

// Setup Cloudflare dev platform for local development
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
