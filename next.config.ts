/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ['tdqbrtvdxjozkbxrlsia.supabase.co'], // Correctly configured domain
    formats: ['image/avif', 'image/webp'],  // Only support avif and webp formats
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
    },
  },
}
