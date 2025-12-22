/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Removed 'output: export' to enable API routes
  // Static export doesn't support API routes, we need server-side rendering for /api/*
  images: {
    unoptimized: true,
  },
}

export default nextConfig
