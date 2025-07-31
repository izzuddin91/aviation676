/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
    // Fix "undici" in firebase compat modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
      }
    }
    return config
  },
  images: {
    domains: [
      "i9.ytimg.com",
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
