import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // French is the default language and is served at the root URL; English lives at /en.
  async rewrites() {
    return [{ source: "/", destination: "/fr" }];
  },
  async redirects() {
    return [{ source: "/fr", destination: "/", permanent: false }];
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // One small Tailwind stylesheet: inline it so the first paint doesn't wait on a CSS request.
    inlineCss: true,
  },
};

export default nextConfig;
