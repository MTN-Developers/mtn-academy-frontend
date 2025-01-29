import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "d3etitelwwg9fo.cloudfront.net",
      "efficaciousleadership.com",
      "managethenow.com", // Added this domain
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3etitelwwg9fo.cloudfront.net",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "efficaciousleadership.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "managethenow.com",
        port: "",
        pathname: "/**", // This will allow all paths under managethenow.com
      },
    ],
  },
};

export default withNextIntl(nextConfig);
