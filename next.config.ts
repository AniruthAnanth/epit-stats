import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  /**
   * Static export mode (for GitHub Pages deployment).
   * Comment out during local development if you encounter issues.
   */
  output: "export",
  basePath: isProd ? "/epi-stats" : "",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
