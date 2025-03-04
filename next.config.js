/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dynamic server rendering instead of static export
  // output: 'export',
  
  // Enable image optimization for dynamic rendering
  images: {
    domains: ['lh3.googleusercontent.com'], // Allow Google profile images
  },
  
  // Enable server components
  experimental: {
    esmExternals: true,
  },
  
  // Disable trailing slashes for dynamic rendering
  // trailingSlash: true,
  
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
