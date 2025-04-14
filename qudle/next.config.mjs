// next.config.mjs
const nextConfig = {
    experimental: {
      serverActions: true,
    },
    images: {
      domains: ['images.unsplash.com'], // Add your image hosts
    },
  };
  
  export default nextConfig;