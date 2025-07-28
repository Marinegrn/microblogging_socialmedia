import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  images: {
    domains: [
      "images.unsplash.com",
      "avatars.githubusercontent.com", // pour les avatars GitHub
      "cdn.sanity.io",                // par exemple Sanity CMS
      "lh3.googleusercontent.com",   // avatars Google
      "pbs.twimg.com",                // images Twitter
      "cdn.discordapp.com",           // images Discord
    ],
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;


