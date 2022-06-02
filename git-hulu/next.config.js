/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['links.papareact.com', 'image.tmdb.org','upload.wikimedia.org'],
  },
}

module.exports = nextConfig
