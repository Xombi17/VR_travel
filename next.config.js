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
};

module.exports = nextConfig;
