import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //  images: {
  //   remotePatterns: [new URL('https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?w=500')],
  // },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
