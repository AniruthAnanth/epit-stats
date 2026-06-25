import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export mode (for GitHub Pages deployment).
   * Comment out during local development if you encounter issues.
   */
  // output: "export",
  // basePath: "/nextjs-github-pages",

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
