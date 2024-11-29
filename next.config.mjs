/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:7000/api/:path*', // Proxy to Flask backend
      },
    ];
  },
};

export default nextConfig; // Use ES module syntax for export
