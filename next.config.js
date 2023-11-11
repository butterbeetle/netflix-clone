/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 86400,
    domains: ["image.tmdb.org", "via.placeholder.com", "img.youtube.com"],
  },
};

module.exports = nextConfig;
