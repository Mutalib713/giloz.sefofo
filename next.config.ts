import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ugc.production.linktr.ee" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  // Lint is available via `npm run lint`; don't fail production builds on it.
  eslint: { ignoreDuringBuilds: true },
  // Keep TypeScript strictness enforced at build time.
  typescript: { ignoreBuildErrors: false },
};

export default nextConfig;
