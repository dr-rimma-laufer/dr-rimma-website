import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization - let Cloudflare handle it
  images: {
    unoptimized: true,
  },
};

// Setup Cloudflare dev platform for local development
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform();
}

export default nextConfig;
