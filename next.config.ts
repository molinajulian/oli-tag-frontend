import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Image optimization for frontend
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    // Disable optimization for static export
    ...(isProduction && {
      unoptimized: true,
    }),
  },

  // Security headers (only for production builds)
  ...(!isDev && {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'X-Frame-Options',
              value: 'DENY',
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff',
            },
            {
              key: 'Referrer-Policy',
              value: 'origin-when-cross-origin',
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block',
            },
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' " + (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000') + " https://api.qrserver.com https://www.google-analytics.com; frame-src 'self'",
            },
          ],
        },
      ];
    },
  }),

  // Performance optimizations
  experimental: {
    // optimizeCss: true, // Disabled due to build issues
    ...(isProduction && {
      serverMinification: true,
    }),
  },

  // ESLint configuration - enforce clean code
  eslint: {
    ignoreDuringBuilds: false,
  },

  // TypeScript configuration - enforce type safety
  typescript: {
    ignoreBuildErrors: false,
  },

  // Static export configuration (temporarily disabled for dynamic routes)
  // Uncomment when all dynamic routes have generateStaticParams
  // ...(isProduction && {
  //   output: 'export',
  //   trailingSlash: true,
  //   skipTrailingSlashRedirect: true,
  // }),
};

export default nextConfig;
