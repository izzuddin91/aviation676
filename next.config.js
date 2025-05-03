/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.pinimg.com",
      "firebasestorage.googleapis.com",
      "www.twincitiesflight.com",
      "thisisflight.net",
      "instagram.fkix2-1.fna.fbcdn.net" // (if using Instagram thumbnails too)
    ],
  },
    experimental: {
        serverActions: {
          allowedOrigins: ['my-proxy.com', '*.my-proxy.com'],
        },
      },
}

module.exports = nextConfig
