/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          },
          {
            protocol: 'https',
            hostname: 'placehold.co',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'picsum.photos',
          },
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
          }
        ],
      },
      async redirects() {
        return [
          {
            source: '/', 
            destination: '/home',
            permanent: true, 
          },
        ];
      },
      taticPageGenerationTimeout: 240
};

export default nextConfig;
