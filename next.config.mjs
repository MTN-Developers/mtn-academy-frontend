import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["d3etitelwwg9fo.cloudfront.net"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d3etitelwwg9fo.cloudfront.net",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
