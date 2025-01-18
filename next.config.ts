import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  }
};

/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
}

export default nextConfig;
