import nextPWA from 'next-pwa'; // ➊ PWA helper (Workbox under the hood)
import createNextIntlPlugin from 'next-intl/plugin'; // ➋ Your existing i18n plugin

/* ------------------------------------------------------------------ */
/* 1.  Configure the PWA plugin                                        */
/* ------------------------------------------------------------------ */
const withPWA = nextPWA({
  dest: 'public', // where service‑worker.js will be output
  register: true, // auto‑inject the SW registration script
  skipWaiting: true, // take control as soon as an update is available
  disable: process.env.NODE_ENV === 'development', // turn off SW in dev
  runtimeCaching: [
    // Google Fonts
    {
      urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    // Remote images (CloudFront, Cloudinary, S3, etc.)
    {
      urlPattern: /^https:\/\/.*\.(?:png|jpg|jpeg|svg|gif|webp)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'images',
        expiration: { maxEntries: 64, maxAgeSeconds: 60 * 60 * 24 * 7 },
      },
    },
  ],
});

/* ------------------------------------------------------------------ */
/* 2.  Your existing next‑intl plugin                                  */
/* ------------------------------------------------------------------ */
const withNextIntl = createNextIntlPlugin();

/* ------------------------------------------------------------------ */
/* 3.  Core Next.js config (unchanged aside from minor whitespace)     */
/* ------------------------------------------------------------------ */
const nextConfig = {
  images: {
    domains: [
      'd3etitelwwg9fo.cloudfront.net',
      'efficaciousleadership.com',
      'managethenow.com',
      's3.amazonaws.com', // S3 domain
      'res.cloudinary.com',
      'via.placeholder.com', // placeholder domain

      'images.therapygym.online', // ← added
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd3etitelwwg9fo.cloudfront.net',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'efficaciousleadership.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'managethenow.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* 4.  Compose the plugins — order is safe either way                  */
/* ------------------------------------------------------------------ */
export default withNextIntl(withPWA(nextConfig));
