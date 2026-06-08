import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'sfptdiaqmjgznnowyqry.supabase.co' },
    ],
  },
};

export default nextConfig;
