module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    imageSizes: [128, 256, 512, 1024, 2048],
  },
  async redirects() {
    return [
      {
        source: '/(.*)',
        destination: 'https://natecirino.com/:path*',
        permanent: true,
      },
    ];
  },
};