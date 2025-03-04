/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure for static export
  output: 'export',
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Disable server components for static export
  experimental: {
    esmExternals: true,
  },
  // Ensure trailing slashes for static export
  trailingSlash: true,
  // Disable TypeScript checking during build
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
