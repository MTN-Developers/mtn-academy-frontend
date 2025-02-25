import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'd3etitelwwg9fo.cloudfront.net',
      'efficaciousleadership.com',
      'managethenow.com',
      's3.amazonaws.com', // Added S3 domain
      'res.cloudinary.com',
      'via.placeholder.com', // Added placeholder domain
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3etitelwwg9fo.cloudfront.net',
        port: '',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'efficaciousleadership.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'managethenow.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/**', // This will allow all paths under s3.amazonaws.com
      },
    ],
  },
};

export default withNextIntl(nextConfig);
